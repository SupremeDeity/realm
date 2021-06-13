module.exports = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ]
            }
        ]
    }
}