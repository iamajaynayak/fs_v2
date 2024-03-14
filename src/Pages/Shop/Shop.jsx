import CollectionOverview from "../../Components/collectionOverview/CollectionOverview.jsx";
import CollectionPage from "../Collection/CollectionPage.jsx";
import {
  getCollectionsList,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase";
import { Route } from "react-router-dom";


import { WithSpinner } from "../../Components/index.js";


import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";




const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


 const Shop = ({match}) => {

  const dispatch = useDispatch();
  const [ loading, updateLoadingState] = useState(true)

  useEffect(() => {
    async function fetch(){
      const collectionLists = await getCollectionsList()
      const collectionMap = convertCollectionSnapshotToMap(collectionLists)
      dispatch(updateCollections(collectionMap));
      updateLoadingState(state => !state)
    }
    fetch()
  }, [])

  return <div className="shop-page">
        <Route
            exact
            path={`${match.path}`}
            render={(props) => (
              <CollectionOverviewWithSpinner isLoading={loading} {...props} />
            )}
          />
          <Route
            path={`${match.path}/:collectionId`}
            render={(props) => (
              <CollectionPageWithSpinner isLoading={loading} {...props} />
            )}
          />
        </div>
}

export default Shop