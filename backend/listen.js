const app = require("./app");

const PORT = process.env.PORT || 3000;  // Use the environment port or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
