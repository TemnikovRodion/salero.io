import { Link, Text } from '@/Components/_Common';
import { UserModel } from '@/Models/Contract';
import { numberUtils } from '@/Utils';
import { ColumnsType } from 'antd/lib/table';

export function useUsersColumnsInfo(): ColumnsType<UserModel> {
  return [];
}
