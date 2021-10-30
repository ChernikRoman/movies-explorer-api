function signout(req, res) {
  res
    .clearCookie('jwt')

    .send({ message: 'Выход выполнен' });
}

module.exports = {
  signout,
};
