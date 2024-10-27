import {useRouter} from "next/router";
import Spinner from "../@core/components/spinner";

const Home = () => {
  const router = useRouter();

  router.push('/dashboards')

  return <Spinner />
}

export default Home
