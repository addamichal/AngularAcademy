const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/token"
      ],
      target: "http://localhost:4300",
      secure: false
  }
]

module.exports = PROXY_CONFIG;
