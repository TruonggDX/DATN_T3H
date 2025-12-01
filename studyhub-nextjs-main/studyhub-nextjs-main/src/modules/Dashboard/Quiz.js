import Quizes from "@/data/quizes.json";
import Link from "next/link";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardQuiz() {
	const paginatePerPage = 6;

	const [ totalPaginate, setTotalPaginate ] = useState( Quizes.length );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ totalPage, setTotalPage ] = useState( Math.ceil(totalPaginate/paginatePerPage) );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );

	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setCurrentPage(selectedPage);
		setStartItemCount( selectedPage * paginatePerPage - paginatePerPage );
		setEndItemCount( selectedPage * paginatePerPage );
	};

	const handlePaginateReset = () =>{
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });
	}


	return (
		<div className="rts-reviewd-area-dashed table-responsive">
			<h5 className="title">My Quiz Attempsts</h5>
			<table className="table-reviews quiz">
				<thead>
					<tr>
						<th>Quiz Info</th>
						<th>Question</th>
						<th>Total Marks</th>
						<th>CA</th>
						<th>IA</th>
						<th>Earned Marks</th>
						<th>Result</th>
						<th>Details</th>
					</tr>
				</thead>
				<tbody>
					{
						Quizes.map((quiz, key) => {
							const resultStatus = Math.ceil(quiz.obtainedMarks/quiz.totalMarks * 100);
							return (
								<tr key={key}>
									<td>
										<div className="information-quiz">
											<span>{quiz.date}</span>
											<p className="quiz">{quiz.quizName}</p>
											<p><span className="quiz">Students:</span> {quiz.student}</p>
										</div>
									</td>
									<td>
										<span className="questions">{quiz.totalQuestions}</span>
									</td>
									<td>
										<span className="marks">{quiz.totalMarks}</span>
									</td>
									<td>
										<span >{quiz.correctAnswers}</span>
									</td>
									<td>
										<span >{quiz.incorrectAnswers}</span>
									</td>
									<td>
										<span >{resultStatus}%</span>
									</td>
									<td>
										{
											resultStatus > 40 ?
											<span className="pass">Pass</span> :
											<span className="fail">Fail</span>
										}
									</td>
									<td>
										<Link href={`quiz/${quiz.slug}`} className="rts-btn btn-border">Details</Link>
									</td>
								</tr>
							);
						}).slice(startItemCount,endItemCount)
					}
				</tbody>
			</table>
			<div className="pagination-full-width">
				<span>Page {currentPage} of {totalPage}</span>
				<div className="pagination">
					<ReactPaginate
						key={paginationKey}
						breakLabel="..."
						onPageChange={ handlePageChange }
						nextLabel={ <i className="fa-solid fa-chevron-right"></i> }
						previousLabel={ <i className="fa-solid fa-chevron-left"></i> }
						pageRangeDisplayed={ 3 }
						forcePage={ forcePage }
						pageCount={ Math.ceil(
							totalPaginate / paginatePerPage
						) }
						renderOnZeroPageCount={ null }
					/>
				</div>
			</div>
		</div>
	)
}
