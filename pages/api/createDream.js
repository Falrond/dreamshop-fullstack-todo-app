import { table, getSimplifyRecord } from '../api/utlis/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = await getSession(req, res);
  const body = req.body;
  const name = body.name;
  try {
    const dreamsArray = await table.create([
      {
        fields: {
          name,
          userID: user.sub,
        },
      },
    ]);
    const temp = getSimplifyRecord(dreamsArray[0]);
    const singleDream = {
      id: dreamsArray[0].id,
      fields: dreamsArray[0].fields,
      // time: dreamsArray[0]._rawJson.createdTime,
    };
    console.log(temp);
    res.status(200).json(temp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});
