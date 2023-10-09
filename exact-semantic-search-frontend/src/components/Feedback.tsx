import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const Feedback: React.FC<Props> = (props) => {
	const Overlay = () => (
		<ModalOverlay bg="blackAlpha.300" backdropFilter="auto" backdropBlur="7px" />
	);
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
								<input type="checkbox"></input>
								<span>Broken links</span>
							</div>

							<div className="checkbox-field">
								<input type="checkbox"></input>
								<span>Bad AI answer</span>
							</div>
							<div className="checkbox-field">
								<input type="checkbox"></input>
								<span>Bad recommended documents</span>
							</div>
						</div>
						<div className="input-area">
							<span>Can you give more details?</span>
							<textarea></textarea>
						</div>
					</ModalBody>

					<ModalFooter className="feedback-modal-footer">
						<div className="button light" onClick={props.onClose}>
							Close
						</div>
						<div className="button dark" onClick={props.onClose}>
							Submit
						</div>{" "}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};
