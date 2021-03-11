import React from 'react';
import styles from './dashboard.module.css'
import { Link } from 'react-router-dom'

const SoalTable = ({soal, active, isAdmin, path, handleModal}) => {
  return (
<>
				{soal  ? (
					<table className={styles.table}>
						<thead>
							<tr className={`${styles.tr} ${styles.white}`}>
								<th>No</th>
								<th>Try Out</th>
								<th>Created By</th>
								<th>Created At</th>
								{isAdmin ? (
									<>
										<th>Edit</th>
										<th>Delete</th>
									</>
								) : null}
							</tr>
						</thead>
						<tbody>
							{soal.map((val, i) => {
								return (
									<tr
										key={val._id}
										className={
											i % 2 == 0 ? `${styles.transparent}` : `${styles.white}`
										}
									>
										<td>{i + 1}</td>
										<td>
											<Link
												className={styles.soalName}
												to={`${path}/soal/${val._id}`}
											>
												{val.nama}
											</Link>
										</td>
										<td>{val.createdBy}</td>
										<td>{val.created.split("T")[0]}</td>
										{isAdmin ? (
											<>
												<td
													onClick={(e) => handleModal(e)}
													className={styles.editSoal}
												>
													edit
												</td>
												<td
													onClick={(e) => handleModal(e, val._id)}
													className={styles.deleteSoal}
												>
													delete
												</td>
											</>
										) : null}
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<>
						<tr className={styles.soalLoading}>Loading Soal...</tr>
					</>
				)}

</>
  )
}

export default SoalTable;