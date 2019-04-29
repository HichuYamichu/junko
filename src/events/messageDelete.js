module.exports = async (client, message) => {
  console.log(`${message.id} was deleted!`);
  // Partial messages do not contain any content so skip them
  if (!message.partial) {
    console.log(`It had content: "${message.content}"`);
  }
};
