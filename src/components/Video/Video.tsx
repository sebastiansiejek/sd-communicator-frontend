import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { IStore } from 'store/store'
import styled from 'styled-components'
import VideoControl from './VideoControl'
import { IReceivingReturnedSignal, IUsers } from 'types/types'
import SimplePeer from 'simple-peer'

interface IVideo {
  isMuted: boolean
  isPlay: boolean
  socket: any
  roomId: string
}

const StyledVideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;

  video {
    object-fit: cover;
    flex: 1;
  }
`

const Video: React.FC<IVideo> = ({ isMuted, isPlay, socket, roomId }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const peersRef = useRef<any[]>([])
  const [peers, setPeers] = useState<any[]>([])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream

          socket.emit('JOIN_TO_VIDEO', {
            roomId,
            senderId: socket.id
          })

          socket.on('ALL_USERS', (users: IUsers) => {
            const peers: Array<SimplePeer.Instance> = []
            console.log('ALL_USERS')
            users.forEach((userID) => {
              const peer = createPeer(userID, socket.id, stream)

              peersRef.current.push({
                peerID: userID,
                peer
              })

              peers.push(peer)
            })

            setPeers(peers)
          })

          socket.on(
            'USER_JOINED',
            (payload: { signal: SimplePeer.SignalData; callerId: string }) => {
              const peer = addPeer(payload.signal, payload.callerId, stream)
              console.log('USER_JOINED')

              peersRef.current.push({
                peerID: payload.callerId,
                peer
              })

              setPeers((users) => [...users, peer])
            }
          )

          socket.on(
            'RECEIVING_RETURNED_SIGNAL',
            (payload: IReceivingReturnedSignal) => {
              const item = peersRef.current.find((p) => p.peerID === payload.id)
              item.peer.signal(payload.signal)
            }
          )

          videoRef.current.addEventListener('loadedmetadata', () => {
            const { current } = videoRef
            if (current) {
              current.play()

              if (!isPlay)
                stream.getVideoTracks().forEach((video) => video.stop())
            }
          })
        }
      })
      .catch((error) => {
        console.warn(error)
        toast.error(error)
      })
  }, [])

  const createPeer = (
    userToSignal: string,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream
    })

    peer.on('signal', (signal: SimplePeer.SignalData) => {
      console.log('SENDING_SIGNAL')
      socket.emit('SENDING_SIGNAL', {
        userToSignal,
        callerId,
        signal
      })
    })

    return peer
  }

  function addPeer(
    incomingSignal: SimplePeer.SignalData,
    callerId: string,
    stream: MediaStream
  ) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream
    })

    peer.on('signal', (signal: SimplePeer.SignalData) => {
      socket.emit('RETURNING_SIGNAL', { signal, callerId })
      console.log('RETURNING_SIGNAL')
    })

    peer.signal(incomingSignal)

    return peer
  }

  useEffect(() => {
    if (videoRef.current) {
      const { current } = videoRef

      if (current) {
        if (isMuted) current.muted = true
        if (!isMuted) current.muted = false
      }
    }
  }, [isMuted])

  const VideoPartner = ({ peer }: { peer: SimplePeer.Instance }) => {
    const ref = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
      peer.on('stream', (stream: MediaStream) => {
        if (ref.current) {
          ref.current.srcObject = stream
        }
      })
    }, [])

    return <video playsInline autoPlay ref={ref} />
  }

  return (
    <div>
      <StyledVideoContainer>
        <video ref={videoRef} autoPlay playsInline />
        {peers.map((peer, index) => (
          <VideoPartner key={index} peer={peer} />
        ))}
        <VideoControl />
      </StyledVideoContainer>
    </div>
  )
}

export default connect((state: IStore) => {
  return {
    isMuted: state.video.muted,
    isPlay: state.video.play,
    roomId: state.user.roomId
  }
})(Video)
