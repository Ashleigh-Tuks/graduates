import { Query, Args, Resolver } from '@nestjs/graphql';
import { Student } from '@graduates/api/student-profiles/api/shared/data-access';
import { StudentProfileService } from '@graduates/api/student-profiles/service/feature';


@Resolver((of) => Student)
export class StudentResolver {
   constructor(private studentService: StudentProfileService) {}

  @Query((returns) => Student,{ name: 'student' })
  async getStudent(@Args('studentNum', { type: () => String }) id: string) {
    const studentArr = this.studentService.findOneById(id);
    const studentObj = new Student();
    studentObj.dateOfBirth = (await studentArr).pop();
    studentObj.phoneNum = (await studentArr).pop();
    studentObj.email = (await studentArr).pop();
    studentObj.firstName = (await studentArr).pop();
    studentObj.studentNum = (await studentArr).pop();
    studentObj.lastName = (await studentArr).pop();

    return studentObj;
  }
}