import { table, getSimplifyRecord } from '../api/utlis/Airtable';

export default async (req, res) => {
  const body = req.body;
  const id = body.id;
  const fields = body.fields;
  try {
    const updatedDreamsArray = await table.update([{ id, fields }]);

    res.status(200).json(getSimplifyRecord(updatedDreamsArray[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
