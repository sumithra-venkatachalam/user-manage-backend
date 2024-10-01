const express = require('express');
const User = require('../models/user');
const Profile = require('../models/profile');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

router.patch('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');

  Object.assign(user, req.body);
  await user.save();
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');

  await user.delete();
  res.status(204).send();
});

router.get('/:id/profile', async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.id });
  if (!profile) return res.status(404).send('Profile not found');
  res.json(profile);
});

router.post('/:id/profile', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');

  const profile = new Profile({ ...req.body, userId: req.params.id });
  await profile.save();
  res.status(201).json(profile);
});

router.patch('/:id/profile', async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.id });
  if (!profile) return res.status(404).send('Profile not found');

  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

router.delete('/:id/profile', async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.id });
  if (!profile) return res.status(404).send('Profile not found');

  await profile.delete();
  res.status(204).send();
});

module.exports = router;
