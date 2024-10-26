import { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ID is ${id}` });
};
