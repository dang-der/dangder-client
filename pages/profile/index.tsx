import { withAuth } from "../../src/Commons/Library/WithAuth";
import DogProfilePage from "../../src/Components/Units/Profile/DogProfilePage.container";

function ProfilePage() {
  return <DogProfilePage />;
}

export default withAuth(ProfilePage);
