import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="learn React" />);
        
        const instance = component.getInstance();

        console.log(instance);

        expect(instance.state.status).toBe('learn React');
    });
});