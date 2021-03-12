import { useState, useEffect } from "react";
import axios from "axios";
import { getUsers, deleteUser } from "./api";
import styles from "./dashboard.module.css";
import Modal from './modal'
import Loading from './loading'

// asset
import trashIcon from '../asset/trash.svg'

const UsersTable = () => {
	const [users, setUsers] = useState(null);
	const [userId, setUserId] = useState('');
	const [showModal, setShowModal] = useState(false)
	const [ deleted, setDeleted] = useState(false)

	useEffect(() => {
		getUsers(setUsers);
	}, [deleted]);

	const handleModal = (e, id) => {
		setShowModal(!showModal)
		setUserId(id)
	}

	const handleDeleteUser = async (e, id) => {
		console.log('ini user id', id)
		await deleteUser(id)
		console.log('here')
		setShowModal(!showModal)
		setDeleted(!deleted)
	}



	return (
		<>
			{users ? (
				<table className={styles.table}>
					<thead>
						<tr className={`${styles.tr} ${styles.white}`}>
							<th>No</th>
							<th>Username</th>
							<th>Email</th>
							<th>Role</th>
							<th>Created At</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((val, i) => {
							return (
								<tr
									key={val._id}
									className={
										i % 2 == 0 ? `${styles.transparent}` : `${styles.white}`
									}
								>
									<td>{i + 1}</td>
									<td>{val.name}</td>
									<td>{val.email}</td>
									<td>{val.role}</td>
									<td>{val.created.split("T")[0]}</td>
									<td
										onClick={(e) => handleModal(e, val._id)}
										className={styles.deleteSoal}
									>
										<img src={trashIcon} alt=""/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<>
					<tr className={styles.soalLoading}><Loading/></tr>
				</>
			)}

			{showModal ? (
				<Modal
					text={"Are you sure want to delete this user ? "}
					yesOption={(e) => handleDeleteUser(e, userId)}
					noOption={handleModal}
				/>
			) : null}
		</>
	);
};

export default UsersTable;
