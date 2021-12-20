import { connect } from 'mongoose';

export const dbConnect = async (): Promise<void> => {
  const mongodb_local_uri = process.env.MONGODB_LOCAL.replace('DB', process.env.MONGO_LOCAL_BD);
  await connect(mongodb_local_uri);
};
