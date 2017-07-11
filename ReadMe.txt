Overview:
1) The users can use this application to search for a doctor based on their name, title, speciality and their locations.
2) They can also filter the results based on the doctors rating, they can use clear all filters to reset their inputs.
3) Once the user selects a doctor, more details about a doctor are shown along with the doctors who either match the speciality or the title of the currently selected doctor. 
4) The similar results shown along with the doctors details are restricted by location so that the user sees only the listings available in his area or the area of the doctor he chose.
5) The similar results are also prioritized by rating.

Assumptions:
1) Patients search speciality names which are predefined in the test data.
2) Patients want to see similar doctors only in their area
3) Each doctor is differentiated by a unique id.

Things that can be improved with time:
1) Classification of user inputs such as speciality or titles to also include the doctors who are closely related to the search term.
2) Include Google maps api into the application so that the location search can be prepopulated with city names and also get the current location of the user to calculate driving distance to the selected doctors location along with doctors hours, website, contact details and google ratings.
3) Include more filters to sort/ filter data based on doctors price range, driving distance.


Test Data: Size of 9 doctors with 4 in San Francisco, 5 in Detroit. 
1) Currently included titles: [Gastroenterologist,Physician, obstetrician, Gynecologist]
2) Currently included specialites: ["diarrohea","motions","allergy","stomach","fever", "cough", "gas", "appendix", "miscarriage", "pregnancy", "women", "abortion","menstruation","abdomen"]
3) Currently included location: [San Francisco, Detroit]
4) Currently available ratings:[3,5+,4+,4.5+]

Code:
1) index.html: Main html file
2) app.js : Angular Module definition and other javascript functions used in the application
3) style.css: CSS for the application
