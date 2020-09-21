
export class GoogleDriveFolder {
    id: string;
    title: string;
    alternateLink: string;
}

export class GoogleCourseMaterialSet {
    title: string;
    materials : GoogleCourseMaterial;
}

export class GoogleMaterial {
    driveFile: GoogleSharedDriveFile;
    youtubeVideo: GoogleYouTubeVideo;
    link: GoogleLink;
    form: GoogleForm;
}

export class GoogleCourseMaterial {
    driveFile: GoogleSharedDriveFile;
    youtubeVideo: GoogleYouTubeVideo;
    link: GoogleLink;
    form: GoogleForm;
}

export class GoogleSharedDriveFile {
    driveFile: GoogleDriveFile;
    shareMode: GoogleShareMode;
}

export class GoogleDriveFile {
    id: string;
    title: string;
    alternateLink: string;
    thumbnailUrl: string;
}

export class GoogleYouTubeVideo {
    id: string;
    title: string;
    alternateLink: string;
    thumbnailUrl: string;
}

export class GoogleLink {
    url: string;
    alternateLink: string;
    thumbnailUrl: string;
}

export class GoogleForm {
    formUrl: string;
    responseUrl: string;
    title: string;
    thumbnailUrl: string;
}

export enum GoogleShareMode {
    UNKNOWN_SHARE_MODE = 'UNKNOWN_SHARE_MODE',//	No sharing mode specified. This should never be returned.
    VIEW = 'VIEW',//		Students can view the shared file.
    EDIT = 'EDIT',//		Students can edit the shared file.
    STUDENT_COPY = 'STUDENT_COPY'//		Students have a personal copy of the shared file.
}

export class GoogleDate {
    year: number;
    month: number;
    day: number;
}

export class GoogleTimeOfDay {
    hours: number;
    minutes: number;
    seconds: number;
    nanos: number;
}

export class GoogleCourse {
    id: string;
    name: string;
    section: string;
    descriptionHeading: string;
    description: string;
    room: string;
    ownerId: string;
    creationTime: string;
    updateTime: string;
    enrollmentCode: string;
    courseState: GoogleCourseState;
    alternateLink: string;
    teacherGroupEmail: string;
    courseGroupEmail: string;
    teacherFolder: GoogleDriveFolder;
    courseMaterialSets: GoogleCourseMaterialSet[];
    guardiansEnabled: boolean;
    calendarId: string;
}

export enum GoogleCourseState {
    COURSE_STATE_UNSPECIFIED = 'COURSE_STATE_UNSPECIFIED', //	No course state. No returned Course message will use this value.
    ACTIVE = 'ACTIVE',//The course is active.
    ARCHIVED = 'ARCHIVED',//The course has been archived. You cannot modify it except to change it to a different state.
    PROVISIONED = 'PROVISIONED',//The course has been created, but not yet activated. It is accessible by the primary teacher and domain administrators, who may modify it or change it to the ACTIVE or DECLINED states. A course may only be changed to PROVISIONED if it is in the DECLINED state.
    DECLINED = 'DECLINED',//The course has been created, but declined. It is accessible by the course owner and domain administrators, though it will not be displayed in the web UI. You cannot modify the course except to change it to the PROVISIONED state. A course may only be changed to DECLINED if it is in the PROVISIONED state.
    SUSPENDED = 'SUSPENDED'//The course has been suspended. You cannot modify the course, and only the user identified by the ownerId can view the course. A course may be placed in this state if it potentially violates the Terms of Service.
}
export class GoogleCourseWork {
    courseId: string;
    id: string;
    title: string;
    description: string;
    materials: GoogleMaterial[];
    state: GoogleCourseWorkState;
    alternateLink: string;
    creationTime: string;
    updateTime: string;
    dueDate: GoogleDate;
    dueTime: GoogleTimeOfDay;
    scheduledTime: string;
    maxPoints: number;
    workType: GoogleCourseWorkType;
    associatedWithDeveloper: boolean;
    assigneeMode: GoogleAssigneeMode;
    individualStudentsOptions: GoogleIndividualStudentsOptions;
    submissionModificationMode:GoogleSubmissionModificationMode;
    creatorUserId: string;
    topicId: string;
  
    // Union field details can be only one of the following:
    assignment: GoogleAssignment;
    multipleChoiceQuestion: GoogleMultipleChoiceQuestion;
}


export enum GoogleCourseWorkState {
    COURSE_WORK_STATE_UNSPECIFIED = 'COURSE_WORK_STATE_UNSPECIFIED', //	No state specified. This is never returned.
    PUBLISHED = 'PUBLISHED',//Status for work that has been published. This is the default state.
    DRAFT = 'DRAFT',//Status for work that is not yet published. Work in this state is visible only to course teachers and domain administrators.
    DELETED = 'DELETED',//Status for work that was published but is now deleted. Work in this state is visible only to course teachers and domain administrators. Work in this state is deleted after some time.
}

export enum GoogleCourseWorkType{
    COURSE_WORK_TYPE_UNSPECIFIED = 'COURSE_WORK_TYPE_UNSPECIFIED',//	No work type specified. This is never returned.
    ASSIGNMENT = 'ASSIGNMENT',//	An assignment.
    SHORT_ANSWER_QUESTION = 'SHORT_ANSWER_QUESTION',//	A short answer question.
    MULTIPLE_CHOICE_QUESTION = 'MULTIPLE_CHOICE_QUESTION',//	A multiple-choice question.
}


export enum GoogleAssigneeMode{
    ASSIGNEE_MODE_UNSPECIFIED = 'ASSIGNEE_MODE_UNSPECIFIED',//	No mode specified. This is never returned.
    ALL_STUDENTS = 'ALL_STUDENTS',//	All students can see the item. This is the default state.
    INDIVIDUAL_STUDENTS = 'INDIVIDUAL_STUDENTS',//	A subset of the students can see the item.
}

export class GoogleIndividualStudentsOptions{
    studentIds: string[];
}

export enum GoogleSubmissionModificationMode{
    SUBMISSION_MODIFICATION_MODE_UNSPECIFIED = 'SUBMISSION_MODIFICATION_MODE_UNSPECIFIED',//	No modification mode specified. This is never returned.
    MODIFIABLE_UNTIL_TURNED_IN = 'MODIFIABLE_UNTIL_TURNED_IN',//	Submissions can be modified before being turned in.
    MODIFIABLE = 'MODIFIABLE',//	Submissions can be modified at any time.
}

export class GoogleAssignment{
  studentWorkFolder: GoogleDriveFolder;
}

export class GoogleMultipleChoiceQuestion{
    choices : string[];
}

export class GoogleCourseWorkTopic{
    courseId: string;
    topicId: string;
    name: string;
    updateTime: string;
}