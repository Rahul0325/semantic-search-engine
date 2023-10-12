import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../db/repositories";
import { FeedbackData } from "../constants/constants";

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	feedbackData: FeedbackData;
	setFeedbackData: React.Dispatch<React.SetStateAction<FeedbackData>>
};

export const Feedback: React.FC<Props> = (props) => {
	const [feedbackText, setFeedbackText] = useState<string>("");
	const [isBadAnswer, setIsBadAnswer] = useState<boolean>(false);
	const [isBadDocs, setIsBadDocs] = useState<boolean>(false);

	const Overlay = () => (
		<ModalOverlay bg="blackAlpha.300" backdropFilter="auto" backdropBlur="7px" />
	);

	const submitFeedback = async () => {
		try {
			let _temp: FeedbackData = {
				...props.feedbackData, 
				feedback: feedbackText, 
				isBadAnswer: isBadAnswer, 
				isBadDocs: isBadDocs
			}
			const docRef = await addDoc(collection(db, "user-feedback"), _temp);
			console.log("Document written with ID: ", docRef.id);
		  } catch (e) {
			console.error("Error adding document: ", e);
		  }
		props.setFeedbackData({})
		props.onClose()
	}

	return (
		<div className="feedback-modal">
			<Modal
				isCentered={true}
				isOpen={props.isOpen}
				onClose={props.onClose}
				size={"2xl"}
				motionPreset="scale"
			>
				{<Overlay />}
				<ModalContent>
					<ModalHeader>How can we improve?</ModalHeader>
					<ModalCloseButton />
					<ModalBody className="feedback-modal-body">
						<div className="checkbox-area">
							
							<div className="checkbox-field">
								<input 
									type="checkbox"
									checked={isBadAnswer}
									onChange={(e) => setIsBadAnswer(e.currentTarget.checked)}
								></input>
								<span>Bad AI answer</span>
							</div>
							<div className="checkbox-field">
								<input 
									type="checkbox"
									checked={isBadDocs}
									onChange={(e) => setIsBadDocs(e.currentTarget.checked)}
								></input>
								<span>Bad recommended documents</span>
							</div>
						</div>
						<div className="input-area">
							<span>Can you give more details?</span>
							<textarea
								value={feedbackText}
								onChange={(e) => setFeedbackText(e.currentTarget.value)}
							></textarea>
						</div>
					</ModalBody>

					<ModalFooter className="feedback-modal-footer">
						<div className="button light" onClick={props.onClose}>
							Close
						</div>
						<div className="button dark" onClick={submitFeedback}>
							Submit
						</div>{" "}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};
