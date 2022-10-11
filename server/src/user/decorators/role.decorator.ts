import { UserRole } from '../models/user.model';
import { SetMetadata } from '@nestjs/common';

export const Role = (...role: UserRole[]) => SetMetadata('role', role);