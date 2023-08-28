import ExampleModel, {
  CreateExampleType,
  ExampleInterface,
} from '../models/Example.model';
import { RequiredField } from '../utils';

const exampleServices = { create, getAll, getById, update, del };

export default exampleServices;

async function create(exampleData: CreateExampleType) {
  const createdExample = await ExampleModel.create({ ...exampleData });
  return createdExample;
}

async function getAll(interest?: string, select?: string) {
  if (!interest && !select) {
    return ExampleModel.find();
  } else if (interest && !select) {
    const exampleData = await ExampleModel.find({ interests: interest });
    return exampleData;
  } else if (select !== undefined) {
    const exampleData = await ExampleModel.find().select(select);
    return exampleData;
  }
}
async function getById(id: string, select?: string) {
  if (select !== undefined) {
    const example = await ExampleModel.findOne({ _id: id }).select(select);
    return example;
  }
  const example = await ExampleModel.findOne({ _id: id });
  return example;
}
async function update(id: string, requestBody: ExampleInterface) {
  const example = await ExampleModel.findByIdAndUpdate(id, requestBody);
  return example;
}
async function del(id: string) {
  const deletedExample = await ExampleModel.deleteOne({ _id: id });
  return deletedExample;
}
