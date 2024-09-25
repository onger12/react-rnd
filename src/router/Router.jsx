import { Router as RR, Route, Switch } from 'wouter';

import { 
  AboutScreen, AdminColabsScreen, AdminCoursesScreen, AdminScreen, AdminStatsScreen, AssigmentsScreen, AuthAdminScreen, AuthColabScreen, 
  CourseScreen, CoursesScreen, HomeScreen, LearnScreen, NotFoundScreen, PolicyScreen, ReviewScreen, SchoolsScreen, SlidesMakerScreen,
  TermsScreen, 
} from '../screens';
import { AdminSchoolsScreen } from '../screens/admin/AdminSchoolsScreen';

export const Router = () => {
  return (
    <>
      <RR base="/Capacitaciones-APP">
        <Switch>
          <Route path="/" component={HomeScreen} />
          <Route path="/about" component={AboutScreen} />
          <Route path="/terms" component={TermsScreen} />
          <Route path="/policy" component={PolicyScreen} />
          <Route path="/auth/admin" component={AuthAdminScreen} />
          <Route path="/auth/colab" component={AuthColabScreen} />

          <Route path="/learn/:dni" component={LearnScreen} />
          <Route path="/learn/:dni/review" component={ReviewScreen} />
          <Route path="/learn/:dni/schools" component={SchoolsScreen} />
          <Route path="/learn/:dni/assigments" component={AssigmentsScreen} />
          <Route path="/learn/:dni/schools/:schoolId" component={CoursesScreen} />
          <Route path="/learn/:dni/schools/:schoolId/:courseId" component={CourseScreen} />
          <Route path="/learn/:dni/schools/:schoolId/:courseId/:videoId" component={CourseScreen} />

          <Route path="/admin" component={AdminScreen} />
          <Route path="/admin/colabs" component={AdminColabsScreen} />
          <Route path="/admin/schools" component={AdminSchoolsScreen} />
          <Route path="/admin/courses" component={AdminCoursesScreen} />
          <Route path="/admin/stats" component={AdminStatsScreen} />
          <Route path="/admin/maker" component={SlidesMakerScreen} />
          
          <Route component={NotFoundScreen} />
        </Switch>
      </RR>
    </>
  )
}
