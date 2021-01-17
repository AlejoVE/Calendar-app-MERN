import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import {
	eventCleanActiveEvent,
	eventStartAddNew,
	eventStartUpdate,
} from '../../actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

//Este #root sale del index.html
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
// const endDate = moment(now).add(1, 'hours');
const nowPlus1 = now.clone().add('1', 'hours');

const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
	const dispatch = useDispatch();

	const { modalOpen } = useSelector((state) => state.ui);
	const { activeEvent } = useSelector((state) => state.calendar);

	const [dateStart, setDateStart] = useState(now.toDate());
	const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
	const [titleValid, setTitleValid] = useState(true);

	const [formValues, setFormValues] = useState(initEvent);

	const { title, notes, start, end } = formValues;

	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		} else {
			setFormValues(initEvent);
		}
	}, [activeEvent, setFormValues]);

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const closeModal = () => {
		dispatch(uiCloseModal());
		dispatch(eventCleanActiveEvent());

		setTimeout(() => {
			setFormValues(initEvent);
		}, 100);
	};

	const handleStartDateChange = (e) => {
		setDateStart(e);
		setFormValues({
			...formValues,
			start: e,
		});
	};

	const handleEndDateChange = (e) => {
		setDateEnd(e);
		setFormValues({
			...formValues,
			end: e,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const momentStart = moment(start);
		const momentEnd = moment(end);

		if (momentStart.isAfter(momentEnd)) {
			Swal.fire(
				'Error',
				'La fecha final debe ser mayor de la fecha de inicio.',
				'error'
			);
			return;
		}

		if (title.trim() < 2) {
			setTitleValid(false);
			return;
		}

		if (activeEvent) {
			dispatch(eventStartUpdate(formValues));
		} else {
			dispatch(
				eventStartAddNew(formValues)
			);
		}

		setTitleValid(true);
		closeModal();
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			closeTimeoutMS={200}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<h1> {activeEvent ? 'Editar evento' : 'Nuevo Evento'}</h1>
			<hr />
			<form className="container" onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={dateEnd}
						minDate={dateStart}
						className="form-control"
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${!titleValid && 'is-invalid'}`}
						placeholder="Título del evento"
						name="title"
						value={title}
						autoComplete="off"
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={notes}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
