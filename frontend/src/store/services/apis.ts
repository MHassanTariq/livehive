const env = "dev";

const config = {
  dev: {
    BASE_URL: "http://localhost:3001",
  },
  prod: {
    BASE_URL: "",
  },
};

const Config = config[env];

export default Config;
