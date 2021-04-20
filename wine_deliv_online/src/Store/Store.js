import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllReducer } from "./CombineReducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { SagaWatcher } from "./SagaWatcher";

const persistConfig = {
  key: "winedeliveryonline",
  storage: AsyncStorage,
  blacklist: [],
};

const SagaMiddleware = createSagaMiddleware();

const AllMiddleware = applyMiddleware(SagaMiddleware, logger);

const persistedReducer = persistReducer(persistConfig, AllReducer);

export const Store = createStore(persistedReducer, AllMiddleware);

export const Persistor = persistStore(Store);

SagaMiddleware.run(SagaWatcher);
