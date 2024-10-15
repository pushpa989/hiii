public with sharing class SJTC {
    @AuraEnabled 
    public static Map<String, Integer> getTopHeadersData() {
        List<CourseConnection__c> courseConnections = [
            SELECT Id, 
                   CourseOffering__r.collegeOrUniversity__c, 
                   Contact__c, 
                   CourseOffering__r.Mentor__c, 
                   CourseOffering__r.Course__c, 
                   CourseOffering__r.Course__r.Program__c
            FROM CourseConnection__c 
            WHERE Type__c = 'Student' 
            AND Status__c = 'Active'
        ];
 
        Set<Id> uniqueUniversities = new Set<Id>();
        Set<Id> uniqueMentors = new Set<Id>();
        Set<Id> uniqueContacts = new Set<Id>();
        Set<Id> uniqueCourses = new Set<Id>();
        Set<Id> uniquePrograms = new Set<Id>();
 
        for (CourseConnection__c cc : courseConnections) {
            if (cc.CourseOffering__r.collegeOrUniversity__c != null) {
                uniqueUniversities.add(cc.CourseOffering__r.collegeOrUniversity__c);
            }
            if (cc.Contact__c != null) {
                uniqueContacts.add(cc.Contact__c);
            }
            if (cc.CourseOffering__r.Mentor__c != null) {
                uniqueMentors.add(cc.CourseOffering__r.Mentor__c);
            }
            if (cc.CourseOffering__r.Course__c != null) {
                uniqueCourses.add(cc.CourseOffering__r.Course__c);
            }
            if (cc.CourseOffering__r.Course__r.Program__c != null) {
                uniquePrograms.add(cc.CourseOffering__r.Course__r.Program__c);
            }
        }
 
        Map<String, Integer> resultMap = new Map<String, Integer>();
        resultMap.put('UniqueUniversities', uniqueUniversities.size());
        resultMap.put('UniqueMentors', uniqueMentors.size());
        resultMap.put('UniqueContacts', uniqueContacts.size());
        resultMap.put('UniqueCourses', uniqueCourses.size());
        resultMap.put('UniquePrograms', uniquePrograms.size());
 
        return resultMap;
    }
    
    @AuraEnabled
    public static List<Map<String, Object>> getUniversityWiseData() {
        List<CourseConnection__c> courseConnections = [
            SELECT Id, 
                CourseOffering__r.collegeOrUniversity__r.Name, 
                Contact__c, 
                CourseOffering__r.Mentor__c, 
                CourseOffering__r.Course__c, 
                CourseOffering__r.Course__r.Program__c
            FROM CourseConnection__c 
            WHERE Type__c = 'Student' 
            AND Status__c = 'Active'
        ];

        Map<String, Map<String, Set<Id>>> universityDataMap = new Map<String, Map<String, Set<Id>>>();

        for (CourseConnection__c cc : courseConnections) {
            String universityName = cc.CourseOffering__r.collegeOrUniversity__r.Name;

            if (!universityDataMap.containsKey(universityName)) {
                universityDataMap.put(universityName, new Map<String, Set<Id>>{
                    'Mentors' => new Set<Id>(),
                    'Contacts' => new Set<Id>(),
                    'Programs' => new Set<Id>()
                });
            }

            if (cc.CourseOffering__r.Mentor__c != null) {
                universityDataMap.get(universityName).get('Mentors').add(cc.CourseOffering__r.Mentor__c);
            }

            if (cc.Contact__c != null) {
                universityDataMap.get(universityName).get('Contacts').add(cc.Contact__c);
            }

            if (cc.CourseOffering__r.Course__r.Program__c != null) {
                universityDataMap.get(universityName).get('Programs').add(cc.CourseOffering__r.Course__r.Program__c);
            }
        }

        List<Map<String, Object>> universityWiseDataList = new List<Map<String, Object>>();
        Integer serialNumber = 1; 

        for (String university : universityDataMap.keySet()) {
            Map<String, Object> universityData = new Map<String, Object>();
            universityData.put('SerialNumber', serialNumber); 
            universityData.put('University', university);
            universityData.put('MentorsCount', universityDataMap.get(university).get('Mentors').size());
            universityData.put('ContactsCount', universityDataMap.get(university).get('Contacts').size());
            universityData.put('ProgramsCount', universityDataMap.get(university).get('Programs').size());

            universityWiseDataList.add(universityData);
            serialNumber++; 
        }

        return universityWiseDataList;
    }

    @AuraEnabled
    public static List<String> getUniqueProgramNames(String selectedUniversity) {
        List<CourseConnection__c> programList = [
            SELECT CourseOffering__r.Course__r.Program__r.Name 
            FROM CourseConnection__c 
            WHERE CourseOffering__r.collegeOrUniversity__r.Name = :selectedUniversity 
            AND CourseOffering__r.Course__r.Program__r.Name != null
        ];
        
        Set<String> programNames = new Set<String>();
        for (CourseConnection__c cc : programList) {
            programNames.add(cc.CourseOffering__r.Course__r.Program__r.Name);
        }
    
        return new List<String>(programNames); 
    }
    
    @AuraEnabled
    public static List<Map<String, Object>> getAllStudentsData(String searchKey, String selectedUniversity, String selectedProgram,
        String selectedYear, String selectedSemester) {

        String query = 'SELECT Id,Student__c, Student__r.Name, CourseConnection__r.Year__c, CourseConnection__r.Semister__c, OverAll_Grade__c, CourseConnection__r.CourseOffering__r.Skills__c ' +
                    'FROM CourseProgress__c WHERE CourseConnection__r.Type__c = \'Student\'';

        List<Object> queryParams = new List<Object>();

        if (searchKey != null && searchKey != '') {
            query += ' AND Student__r.Name like \'%' + searchKey + '%\'';
        }

        if (selectedUniversity != null && selectedUniversity != '') {
            query += ' AND CourseConnection__r.CourseOffering__r.collegeOrUniversity__r.name =:selectedUniversity';
        }

        if (selectedProgram != 'All Programs' && selectedProgram != '') {
            query += ' AND CourseConnection__r.CourseOffering__r.course__r.program__r.Name =:selectedProgram';
        }

        if (selectedYear != 'All Years' && selectedYear != '') {
            query += ' AND CourseConnection__r.Year__c =:selectedYear';
        }

        if (selectedSemester != 'All Sems' && selectedSemester != '') {
            query += ' AND CourseConnection__r.Semister__c =:selectedSemester';
        }

        List<CourseProgress__c> courseProgressList = Database.query(query);

        List<Map<String, Object>> studentsDataList = new List<Map<String, Object>>();
        Integer serialNumber = 1; 

        for (CourseProgress__c cp : courseProgressList) {
            Map<String, Object> studentData = new Map<String, Object>();
            studentData.put('SerialNumber', serialNumber); 
            studentData.put('StudentName', cp.Student__r.Name);
            studentData.put('studentId', cp.Student__c);
            studentData.put('Year', cp.CourseConnection__r.Year__c);
            studentData.put('Semester', cp.CourseConnection__r.Semister__c);
            studentData.put('Grade', cp.OverAll_Grade__c);
            studentData.put('Skills', cp.CourseConnection__r.CourseOffering__r.Skills__c);

            studentsDataList.add(studentData);
            serialNumber++; 
        }

        return studentsDataList;
    }

    @AuraEnabled
    public static List<CourseProgress__c> getSelectedStudentProfile(String studentId){
        String query = 'SELECT Id,Student__c, Student__r.Name,Student__r.Email, Student__r.Phone, Student__r.About__c, Student__r.LinkedIn_Profile__c, Program__r.Name, CourseConnection__r.Year__c,'+
        ' CourseConnection__r.Semister__c, OverAll_Grade__c, CourseConnection__r.CourseOffering__r.Skills__c ' +
        'FROM CourseProgress__c WHERE Student__c=:studentId ';      
        List<CourseProgress__c> courseProgressList = Database.query(query);
        return courseProgressList;
    }

 }