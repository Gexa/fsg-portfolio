import Mailer from "../../lib/node/class/mailer/mailer";
import { htmlToText } from 'html-to-text';

export default (req, res) => {
  if (req.method !== 'POST') {
    res.status(500).json({ message: 'Invalid method.' });
    return;
  }

  const { subject, sender, message, verify, terms } = req.body;
  console.log(typeof req.body);
  if (!message || htmlToText(message).trim().length < 20) {
    console.log(message);
    res.status(422).json({ message: 'Your message is too short! Please type at least 20 characters!' });
    return;
  }

  try {
    const mailer = new Mailer();
    mailer.setMailContent({ message: message, sender: sender }, null);
    mailer.send({ to: ['info@gexasoftware.hu'] },  { subject: subject && subject.trim().length > 3 ? subject : 'Contact from Portfolio' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }

  res.status(200).json({ message: 'Mail successfully sent! Thank you, we will contact you as soon as possible!' });
}
