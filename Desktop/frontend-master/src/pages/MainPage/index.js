import React from 'react';

class MainPage extends React.Component {

    render() {
        return (
            <div>
				<div className="container pt-4">
					<div className="row">
						<div className="main__description">
							<h1 className="justify-content-center d-flex p-3"> Something Interesting </h1>
							<p> 
							As announced at the final exam, the grade breakdown will be posted on Piazza early this week.
							I also announced that my deadline to submit grades is Tuesday. Asking about the course graded
							before the grade deadline is like me asking for your programming submission before the assignment
							deadline. However much the question is asked, however much you want know the information, however
							much I want to know the information, when the information is still unknown, there is no answer
							to the question. I'm not in the situation where I know the answer to your question and am withholding
							it from you. Reading and responding to your question about the course grade breakdown before the
							information is known just causes the very information you seek to be delayed for everyone since
							I'm taking the time to respond to you instead of continuing with the analysis needed to determine
							the course grades. After being at the CSE 12 final exam until after 10pm on Friday night and after
							spending all day Saturday grading final exams until after 6pm, any questions about your course grades
							asked Saturday or Sunday show no consideration to me or to the course staff in allowing a day of rest
							or a reasonable amount of time to pass before expecting the course grade to be determined. You've
							waited more than 10 weeks to know your grade in this course. Can't you wait a few more days before
							demonstrating your impatience? As the student replier indicated, your question is worthy of a
							professionalism deduction. Knowing the answer to your question benefits no one, not even you.
							Knowing now doesn't change your grade, and it doesn't provide insights into the course content.
							Specifically, your question is an example of interactions to avoid such as "asking questions where
							the information will eventually be known." At the beginning of the course, we awarded you 100% for
							the professionalism portion of your course grade assuming that all interactions would be professional.
							Your interaction above indicates that our initial prediction of your professionalism was incorrect.
							I've made an adjustment in your score to reflect the error in our assumptions. If you'd like to explain
							how your question above demonstrates consideration, patience, and professionalism, please let me know.
							</p>
						</div>
					</div>
				</div>

				<div className="justify-content-center d-flex p-3">
					<h2> Instructional Video </h2>
				</div>
				<div className="justify-content-center d-flex p-3">
					<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
				</iframe>
				</div>

            </div>
        )
    }
}

export default MainPage;