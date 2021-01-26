interface options {
  displayIfDocummentIsHidden: boolean
}

class WebNotification {
  options: options

  constructor(options: options = { displayIfDocummentIsHidden: false }) {
    this.options = options
    Notification.requestPermission()
  }

  public display(title: string) {
    const { displayIfDocummentIsHidden } = this.options

    if (displayIfDocummentIsHidden) document.hidden && new Notification(title)
    else new Notification(title)
  }
}

export default WebNotification
