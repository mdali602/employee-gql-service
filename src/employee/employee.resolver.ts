import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { identity } from 'rxjs';
import { Project } from 'src/project/entities/project.entity';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employee') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }

  @ResolveField(() => Project)
  project(@Parent() employee: Employee) {
    return this.employeeService.getProject(employee.projectId);
  }
}
