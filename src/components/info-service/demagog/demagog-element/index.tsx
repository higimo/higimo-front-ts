import { FunctionComponent } from "preact";
import { DemagogType } from "../../../../types";

import { TextContainer } from "../../../ui/text-container";

export const DemagogElement: FunctionComponent<DemagogType> = item => (
    <TextContainer className="demagog__element">
		<h1
			className="demagog__header"
			dangerouslySetInnerHTML={{__html: item.name}}
        />
		<div
			className="demagog__text"
			dangerouslySetInnerHTML={{__html: item.description}}
        />
    </TextContainer>
)