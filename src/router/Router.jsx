import { Route, Switch } from 'wouter';

import { 
  AboutScreen, AdminScreen, AssigmentsScreen, AuthAdminScreen, AuthColabScreen, CourseScreen, 
  CoursesScreen, HomeScreen, LearnScreen, NotFoundScreen, ReviewScreen, SchoolsScreen, SlidesMakerScreen, 
} from '../screens';

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/about" component={AboutScreen} />
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
        <Route path="/admin/maker" component={SlidesMakerScreen} />
        
        <Route component={NotFoundScreen} />
      </Switch>
    </>
  )
}
