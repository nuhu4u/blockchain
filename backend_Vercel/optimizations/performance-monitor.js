// Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.startTimes = new Map();
  }

  startTimer(name) {
    this.startTimes.set(name, performance.now());
  }

  endTimer(name) {
    const startTime = this.startTimes.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics.set(name, duration);
      this.startTimes.delete(name);
      return duration;
    }
    return null;
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  logSlowQueries(threshold = 1000) {
    const slowQueries = Array.from(this.metrics.entries())
      .filter(([name, duration]) => duration > threshold)
      .sort((a, b) => b[1] - a[1]);

    if (slowQueries.length > 0) {
      console.log('🐌 Slow queries detected:');
      slowQueries.forEach(([name, duration]) => {
        console.log('  ' + name + ': ' + duration.toFixed(2) + 'ms');
      });
    }
  }

  reset() {
    this.metrics.clear();
    this.startTimes.clear();
  }
}

// Performance middleware
const performanceMiddleware = (req, res, next) => {
  const monitor = new PerformanceMonitor();
  const startTime = performance.now();

  monitor.startTimer(req.method + ' ' + req.path);

  res.on('finish', () => {
    const duration = monitor.endTimer(req.method + ' ' + req.path);
    const totalTime = performance.now() - startTime;

    if (duration > 1000) {
      console.log('🐌 Slow API: ' + req.method + ' ' + req.path + ' - ' + duration.toFixed(2) + 'ms');
    }

    res.set('X-Response-Time', totalTime.toFixed(2) + 'ms');
  });

  next();
};

module.exports = { PerformanceMonitor, performanceMiddleware };