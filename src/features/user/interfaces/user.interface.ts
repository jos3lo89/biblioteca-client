export interface RegisterUserResponse {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListStudentsResponse {
  data: Array<{
    id: string;
    dni: string;
    name: string;
    lastName: string;
    fullName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    enrollments: Array<{
      id: string;
      userId: string;
      periodId: string;
      canAccess: boolean;
      createdAt: string;
      updatedAt: string;
      period: {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        isCurrent: boolean;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  }>;
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface RegisterStudentResponse {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  enrollments: Array<{
    id: string;
    userId: string;
    periodId: string;
    canAccess: boolean;
    createdAt: string;
    updatedAt: string;
    period: {
      id: string;
      name: string;
      startDate: string;
      endDate: string;
      isCurrent: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }>;
}
