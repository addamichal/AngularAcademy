const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/token"
      ],
      target: "http://localhost:5261",
      secure: false
  }
]

module.exports = PROXY_CONFIG;
