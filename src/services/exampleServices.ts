import ExampleModel, {
  CreateExampleType,
  ExampleInterface,
} from '../models/Example.model';
import { RequiredField } from '../utils';

const exampleServices = { create, getAll };

export default exampleServices;

async function create(exampleData: CreateExampleType) {
  const createdExample = await ExampleModel.create({ ...exampleData });
  return createdExample;
}

async function getAll(exampleData: ExampleInterface) {
  const createdExample = await ExampleModel.create({ ...exampleData });
  return createdExample;
}
