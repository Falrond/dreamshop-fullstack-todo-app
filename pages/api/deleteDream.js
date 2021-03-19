import { table, getSimplifyRecord } from '../api/utlis/Airtable';

export default async (req, res) => {
  const body = req.body;
  const id = body.id;
  try {
    const deletedDreams = await table.destroy([id]);

    res.status(200).json(deletedDreams[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
