export interface blogProps {
  title: string;
  id: number;
  status: 'выполнено' | 'в процессе' | 'ожидает выполнения';
  createdAt: string | undefined;
  updatedAt: string | undefined;
  visible: boolean
  position: boolean
  description: string
}
