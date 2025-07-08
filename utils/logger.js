const logs = [];

exports.logAction = (userId, action, taskId) => {
  logs.unshift({ userId, action, taskId, timestamp: new Date() });
  if (logs.length > 20) logs.pop();
};

exports.getLogs = (req, res) => {
  res.json(logs);
};
