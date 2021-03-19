import { table, simplifyRecords } from '../api/utlis/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = await getSession(req, res);
  try {
    const dreams = await (
      await table
        .select({ view: 'Grid view', filterByFormula: `userID='${user.sub}'` })
        .firstPage()
    ).reverse();
    const simplifiedDreams = simplifyRecords(dreams);
    res.status(200).json(simplifiedDreams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});
