export interface CoursePage {
  id: string;
  title: string;
  content: string;
}

export interface CourseSection {
  id: string;
  title: string;
  pages: CoursePage[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  sections: CourseSection[];
}
