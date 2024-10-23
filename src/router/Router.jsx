import { Router as RR, Route, Switch } from 'wouter';

import { 
  AboutScreen, AdminColabsScreen, AdminCoursesScreen, AdminScreen, AdminStatsScreen, AdminVideosScreen, AssigmentsScreen, AuthAdminScreen, 
  AuthColabScreen, CourseScreen, CoursesScreen, HomeScreen, LearnScreen, NotFoundScreen, PolicyScreen, ReviewScreen, SchoolsScreen, 
  SelectCompanyScreen, 
  SlidesMakerScreen, TermsScreen, 
} from '../screens';
import { AdminSchoolsScreen } from '../screens/admin/AdminSchoolsScreen';

export const Router = () => {
  return (
    <>
      <RR base="/Capacitaciones-APP">
        <Switch>
          <Route path="/" component={SelectCompanyScreen} />
          <Route path="/:company/" component={HomeScreen} />
          <Route path="/:company/about" component={AboutScreen} />
          <Route path="/:company/terms" component={TermsScreen} />
          <Route path="/:company/policy" component={PolicyScreen} />
          <Route path="/:company/auth/admin" component={AuthAdminScreen} />
          <Route path="/:company/auth/colab" component={AuthColabScreen} />

          <Route path="/:company/learn/:dni" component={LearnScreen} />
          <Route path="/:company/learn/:dni/review" component={ReviewScreen} />
          <Route path="/:company/learn/:dni/schools" component={SchoolsScreen} />
          <Route path="/:company/learn/:dni/assigments" component={AssigmentsScreen} />
          <Route path="/:company/learn/:dni/schools/:schoolId" component={CoursesScreen} />
          
          <Route path="/:company/learn/:dni/courses/:courseId" component={CourseScreen} />

          <Route path="/:company/admin" component={AdminScreen} />
          <Route path="/:company/admin/colabs" component={AdminColabsScreen} />
          <Route path="/:company/admin/schools" component={AdminSchoolsScreen} />
          <Route path="/:company/admin/courses" component={AdminCoursesScreen} />
          <Route path="/:company/admin/videos" component={AdminVideosScreen} />
          <Route path="/:company/admin/stats" component={AdminStatsScreen} />
          <Route path="/:company/admin/maker" component={SlidesMakerScreen} />
          
          <Route component={NotFoundScreen} />
        </Switch>
      </RR>
    </>
  )
}
