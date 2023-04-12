import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(project: CreateProjectInput): Promise<Project> {
    const proj = this.projectRepository.create(project);
    return this.projectRepository.save(proj);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['employees'] });
  }

  findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
    // return this.projectRepository.find({ relations: ['employees'] });
  }

  async update(id: string, project: UpdateProjectInput): Promise<Project> {
    const proj = this.projectRepository.create(project);
    proj.id = id;
    return this.projectRepository.save(proj);
    // return this.projectRepository.save(proj)
    // return `This action updates a #${id} project`;
  }

  async remove(id: string): Promise<string> {
    // const id = this.projectRepository.remove(id)
    // return id;
    return `This action removes a #${id} project`;
  }
}
