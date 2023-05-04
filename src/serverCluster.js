const cluster = require("cluster");
const os = require("os");


if (cluster.isMaster) {
  const cpu_s = os.cpus().length;

  console.log(`Forking for ${cpu_s} CPUs`);
  for (let i = 0; i < cpu_s; i++) {
    cluster.fork();
  }
} else {
    require('../src/bin/www')
}