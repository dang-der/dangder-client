import { withAuth } from "../../../src/Commons/Library/WithAuth";
import DogProfileEditPage from "../../../src/Components/Units/Profile/edit/DogProfileEditPage.container";

function ProfileEditPage() {
  return <DogProfileEditPage />;
}

export default withAuth(ProfileEditPage);
