import express from 'express';
import { prisma } from './prisma';


import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import {PrismaFeedbackRepository} from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedbackRepository = new PrismaFeedbackRepository();  
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    feedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});