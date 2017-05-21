class App {
    constructor(data = {}) {
        this.name = data.name || ''
        this.contributors = data.contributors || []
        this.version = data.version || 0
        this.apdex = data.apdex || 0
        this.host = data.host || []
    }

    addHostName(hostName) {
        if (this.host.includes(hostName)) return

        this.host.push(hostName)
    }

}

export default App