interface IUser {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface ITodo {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    user: string;
    createdAt: Date;
    updatedAt: Date;
  }
  